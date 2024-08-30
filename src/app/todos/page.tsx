"use client"
import { useState } from 'react';
import './page.css';
import { ProgressCard, TaskCard } from "../../components";
import { CallGetDataList, CallDeleteData, CallAddData, CallEditData } from '../../api';
import { useEffectOnce } from '@/hooks';


function Todos() {

  const [taskData, setTaskData] = useState<any>([]);
  const [addValue, setAddValue] = useState<string>("");
  const [dropDownValue, setDropDownValue] = useState<any>();

  const options = [
    { value: 'All', label: 'All' },
    { value: 'Done', label: 'Done' },
    { value: 'Undone', label: 'Undone' }
  ]

  const checkHandle = (id: string) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        var jsonParam: any = { id: id, title: taskDataBuffer[index].title, completed: !taskDataBuffer[index].completed };
        CallEditData(jsonParam).then(() => {
          fetchDataFromAPI();
        })
      }
    })
  }

  const fetchDataFromAPI = () => {

    CallGetDataList().then((resp:any)=> {
      var array: any = [];
      
      resp?.data?.data.map((dataResp:any)=> {
        
        var dataResp: any = {
          id: dataResp?.id,
          title: dataResp?.title,
          completed: false,
          popupStatus: false,
          editStatus: false
        }
        array.push(dataResp);
      })

      setTaskData(array);
    })
    
  }

  const initStateData = () => {
    setDropDownValue({ label: "All", value: "All" });
  }

  const handlerAddKeyPress = (evt: any) => {
    if (evt.key === "Enter") {
      var jsonParam: any = { id: null, title: addValue };
      CallAddData(jsonParam).then(()=> {
        fetchDataFromAPI();
        setAddValue(""); //reset
      })
    };
  }

  const popupHandle = (id: any) => {

    var taskDataBuffer: any = taskData;

    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].popupStatus = !taskDataBuffer[index]?.popupStatus
      } else {
        taskDataBuffer[index].popupStatus = false
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const deleteHandle = (id: string) => {

    CallDeleteData(id).then(()=> {
      fetchDataFromAPI();
    });
  }

  const editHandle = (id: any, valueChange: string) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].title = valueChange;
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const editOnClick = (id: any) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        taskDataBuffer[index].editStatus = true;
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  const editSave = (id: any) => {

    var taskDataBuffer: any = taskData;
    taskData.map((value: any, index: number) => {
      if (value.id === id) {
        var jsonParam: any = { id: id, title: taskDataBuffer[index].title, completed: taskDataBuffer[index].completed };
        CallEditData(jsonParam).then(() => {
          fetchDataFromAPI();
        }).catch(()=>{
          fetchDataFromAPI();
        })
      }
    })

    setTaskData([...taskDataBuffer]);
  }

  useEffectOnce(() => {
    fetchDataFromAPI();
    initStateData();
  });

  return (
    <div style={{ padding: "70px 10vw", backgroundColor: "#F5F5F5", borderRadius: "20px", width: "70vw", maxWidth: "720px" }}>
      <ProgressCard taskData={taskData} />
      <TaskCard
        options={options}
        taskData={taskData}
        checkHandle={checkHandle}
        addValue={addValue}
        setAddValue={setAddValue}
        handlerAddKeyPress={handlerAddKeyPress}
        popupHandle={popupHandle}
        editOnClick={editOnClick}
        editHandle={editHandle}
        editSave={editSave}
        deleteHandle={deleteHandle}
        setDropDownValue={setDropDownValue}
        dropDownValue={dropDownValue} 
        showsCheckBox={false}/>
    </div>
  )
}

export default Todos
