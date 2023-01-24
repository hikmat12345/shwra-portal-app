import {  useState } from 'react'


type ITypeData = {
      requestTypeId: number;
      name:  string;
      arabicName: string;
      requestSubTypes:  {
          requestSubTypeId: number;
          name:  string;
          arabicName: string;
      }[]
}


export default function useSelectedValue(data: any){

  const [ hasChildFeild , setHasChildFeild ] = useState<any>(false)
  const [ childFeild , setChildFeild ] = useState<ITypeData>()


  function filterArray(record: ITypeData, id: number) {
    // console.log(record)
    return record.requestTypeId === Number(id);
  }


  function handleChildFeild(id: number) {
    // console.log("handleChildFeild:ID" ,id)  

    const filterd = data.find((record: ITypeData) => filterArray(record, id))
    // console.log("filterd" ,filterd)  

    const isChild: boolean = filterd && filterd.requestSubTypes.length > 0;
    // console.log("isChild" ,isChild)  

    setHasChildFeild(isChild)

    setChildFeild(filterd)

  }
  
  return {
    hasChildFeild,
    childFeild,
    handleChildFeild
  }
}