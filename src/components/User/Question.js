import React from 'react'
import _ from 'lodash'
export default function Question(props) {

    let { data, index, handleCheck } = props

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
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="props" />
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