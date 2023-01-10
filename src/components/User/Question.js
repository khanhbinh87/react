import React, { useState } from 'react'
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
export default function Question(props) {

    let { data, index, handleCheck } = props
    const [imagePreview, setImagePreview] = useState(false)

    if (_.isEmpty(data)) {
        return (<></>)
    }
    const handleCheckBox = (event,aId,qId) => {
       
        handleCheck(aId, qId)
    }

    return (
        <>
            {
                data.image ? <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="props" onClick={() => setImagePreview(true)}/>
                    {
                        imagePreview && <Lightbox zoomStep="0.6" image={`data:image/jpeg;base64,${data.image}`} title={'text'} onClose={() => setImagePreview(false)} />
                    }
                </div> : <div className='q-image'></div>
            }
            <div className='question py-2'>Question {index + 1} : {data.questionDes}</div>
            <div className='answer py-2'>
                {
                    data.answers && data.answers.length > 0 && data.answers.map((a, index) => {

                        return (
                            <div className="form-check" key={`answer-${index}`}>
                                <input
                                     className="form-check-input" 
                                     type="checkbox" 
                                     checked={a.isSelected}
                                    onChange={(event) => handleCheckBox(event, a.id, +data.questionId)} />
                                <label className="form-check-label" >
                                    {a.description}
                                </label>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}
