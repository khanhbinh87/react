import React from 'react'
import _ from 'lodash'
export default function Question(props) {
    let { data, index } = props
    console.log(data)
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {
                data.image && <div>
                    <img src={`data:image/jpeg;base64,${data.image}`} alt="props" style={{ width: "300px" }} />
                </div>
            }
            <div className='question py-2'>Question {index + 1} : {data.questionDes}</div>
            <div className='answer py-2'>
                {
                    data.answers && data.answers.length > 0 && data.answers.map((a, index) => {

                        return (
                            <div className="form-check" key={`answer-${index}`}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
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
