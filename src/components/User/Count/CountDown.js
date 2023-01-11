import React, { useEffect, useState } from 'react'

export default function CountDown(props) {
    const [count, setCount] = useState(300)

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    useEffect(() => {
        if (count === 0) {
            props.onTimeUp()
            return;
        }
        let timer = setInterval(() => {
            setCount(count - 1)
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [count])
    return (
        <div>{toHHMMSS(count)}</div>
    )
}
