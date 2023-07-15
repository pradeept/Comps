import React,{useState,useEffect,useRef} from 'react';
import { GoChevronDown } from "react-icons/go";
import Panel from './Panel';


function DropDown({options,value,onChange}){

    const divEl = useRef();

    const [isOpen, setIsOpen] = useState(false);



    useEffect(()=>{
        const handler = (event)=>{

            //if reference is not assigned to any element
            if(!divEl.current){
                return;
            }


            if(!divEl.current.contains(event.target)){
                setIsOpen(false);
            }
        }

        document.addEventListener('click',handler,true);

        //cleanup function
        return ()=>{
            document.removeEventListener('click',handler);
        }
    },[])


    const handleClick = ()=>{
        setIsOpen((prevState => !prevState));
    }


    const handleOptionClick = (option)=>{
        setIsOpen(false);
        onChange(option);
    }


    const renderedOptions = options.map((option)=>{
        return <div className='hover:bg-sky-100 rounded cursor-pointer p-1 ' key={option.value}  onClick={()=>handleOptionClick(option)} >
            {option.label}
        </div>
    });
    


    return(
        <div ref={divEl} className='w-48 relative'>
            <Panel className='flex justify-between items-center cursor-pointer'
                onClick={handleClick}>
                {value?.label||'Select...'}
                <GoChevronDown className='text-lg'/>
            </Panel>
            {
                isOpen && 
                <Panel className='absolute top-full '>
                    {renderedOptions}
                </Panel>
            }
        </div>
    );

}


export default DropDown;