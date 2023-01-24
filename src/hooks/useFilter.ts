import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {
    RequestManager
  } from '../@types/request';

type FilterState = {
    company : string;
    standard: string;
    type : string;
    status: string;
}
  
function isEmptyString(strValue: string) {
    return  strValue === ""
}


export default function useFilter(requests: RequestManager[]){

    const [filtedData, setFiltedData ]= useState<RequestManager[]>(requests)

    useEffect(()=>{

        setFiltedData(requests)

    }, [setFiltedData, requests])

    const applyFilter = (filterState: FilterState )=> {
      console.log("before:filter", filterState)

      let filteredRequstes: RequestManager[] = requests;
      console.log("filteredRequstes", filteredRequstes)

      // 
      if (!isEmptyString(filterState.company)) {
        console.log("company", filteredRequstes)
        filteredRequstes = filter(filteredRequstes, (_request) => _request.createdBy === filterState.company )
      }

      //
      if (!isEmptyString(filterState.type)) {
        console.log("type", filteredRequstes)
        filteredRequstes = filter(filteredRequstes, (_request) => _request.type === filterState.type )
      } 

      //
      if (!isEmptyString(filterState.standard)) {
        console.log("standard", filteredRequstes)
        filteredRequstes = filter(filteredRequstes, (_request) => _request.standard === filterState.standard )
      }

      // 
      if (!isEmptyString(filterState.status)) {
        console.log("filterState.status", filteredRequstes)
        filteredRequstes = filter(filteredRequstes, (_request) => _request.status === filterState.status )
      }

      if (filteredRequstes) {
        console.log("before:filter", filteredRequstes)
        setFiltedData(filteredRequstes)
      } else {
        console.log("before:filter", filteredRequstes)
        setFiltedData(requests)
      }

    }
  
    return {
        filtedData,
        applyFilter
    }
}