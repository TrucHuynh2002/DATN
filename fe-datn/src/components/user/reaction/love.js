import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { url } from '../../url';
function Love({props}) {
    const [Selected,setSeleted] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const id_user = user ? user[0].id : 0
    // console.log(id_user)
    // Thêm Reaction Love
    const handleClickReaction = async (e) => {
        // console.log(props.id_qa,props.id_user)
        if(Selected){
            setSeleted(false)
            let res = await axios.post(`${url}/reaction-love/${props.id_qa}?_method=PUT`,props);
            // console.log(res.data);
            if(res.data.status){
                getReactionCount()
                setSeleted(false);
                setHiddenReaction(true);
            }
        }else{
            setSeleted(true)
            let res = await axios.post(`${url}/reaction-love`,props);
            // console.log(res.data);
            if(res.data.status){
                getReactionCount()
                setHiddenReaction(true)
            }
        }
    }

    
    const [dataReaction,setDataReaction] = useState([]);
    const [dataUserReaction, setDataUserReaction] = useState([])
    console.log(dataReaction)
    const [HiddenReaction,setHiddenReaction] = useState(true);
    const getReactionCount = async () => {
        let res = await axios.get(`${url}/reaction-love`);
            if(res.data.status){
                
                res.data.data.map((data,index) => {
                    if(data.id_qa == props.id_qa){
                        setHiddenReaction(false);
                        // if(data.id_user == id_user && data.id_qa == props.id_qa){
                        //     setSeleted(true);
                        //     console.log(123)
                        // }
                        res.data.userReaction.map((datas,indexx) => {
                            if(datas.id_user == id_user && datas.id_qa == props.id_qa){
                                setSeleted(true);
                                // console.log(123)
                            }
                        })

                    }
                })
                setDataReaction(res.data.data);
                setDataUserReaction(res.data.userReaction)
            }
    } 

    useEffect(() => {
            getReactionCount()
    },[])
  return (
  
    <div className='Reaction'>
        {
               HiddenReaction 
               ?
               <>
                    <span onClick={e => handleClickReaction(e)}>
                   <i class={Selected ? "SelectedReactionLove fa-regular fa-heart" : "fa-regular fa-heart"}></i>
                   </span>
                   <span>0</span>
               </>
               :
                dataReaction.length > 0 && dataReaction.map((data,index) => {
                // if(user){
                    
                // dataUserReaction.map((datas,indexx) => {
                //         if(datas.id_user == id_user && datas.id_qa == props.id_qa){
                //             setSeleted(true);
                //             console.log(123)
                //         }
                //     })
                // }
                return data.id_qa == props.id_qa
                &&
                
                  <>
                  {
                    !user
                    ?
                    <>
                     <span>
                        <i class={Selected ? "SelectedReactionLove fa-regular fa-heart" : "fa-regular fa-heart"}></i>
                    </span>
                    <span>{data.reactionQa}</span>
                    </>
                    :
                            <>    
                            <span onClick={e => handleClickReaction(e)}>
                            <i class={Selected ? "SelectedReactionLove fa-regular fa-heart" : "fa-regular fa-heart"}></i>
                            </span>
                            <span>{data.reactionQa}</span>
                            </>
                        
                    
                        
                           
                  }
                 
                  </>
            })
            
            
        }

        
    </div>
  )
}

export default Love
