import React, { useEffect, useState } from 'react'
import './Dashboard.scss'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getOverView } from '../../../services/apiServices';
export default function Dashboard() {

  const [dataOverView, setDataOverView] = useState([])
  const [dataChart, setDataChart] = useState([])

  useEffect(() => {
    fetchDataChart()
  }, [])
  const fetchDataChart = async () => {
    let res = await getOverView()

    if (res && res.EC === 0) {

      setDataOverView(res.DT)
      let Qz = 0, Qs = 0, As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0
      Qs = res?.DT?.others?.countQuestions ?? 0
      As = res?.DT?.others?.countAnswers ?? 0
      const data = [
        { name: "Quizzes", "Qz": Qz },
        { name: "Questions", "Qs": Qs },
        { name: "Answers", "As": As },

      ];
      setDataChart(data)
    }
  }
  return (

    <div className='dashboard-container'>
      <div className='title-db'>Analytics Dashboard</div>
      <div className='content'>
        <div className='db-left'>
          <div className='child'>
            <span className='text'>Total users</span>
            <span className='text-1'>{dataOverView && dataOverView.users && dataOverView.users.total ? <>{dataOverView.users.total}</> : <>0</>}</span>
          </div>
          <div className='child'>
            <span className='text'>Total quizzes</span>
            <span className='text-1'>{dataOverView && dataOverView.others
              && dataOverView.others.countQuiz ? <>{dataOverView.others.countQuiz}</> : <>0</>}</span>
          </div>
          <div className='child'>
            <span className='text'>Total questions</span>
            <span className='text-1'>{dataOverView && dataOverView.others
              && dataOverView.others.countQuestions ? <>{dataOverView.others.countQuestions}</> : <>0</>}</span>
          </div>
          <div className='child'>
            <span className='text'>Total answers</span>
            <span className='text-1'>{dataOverView && dataOverView.others
              && dataOverView.others.countAnswers ? <>{dataOverView.others.countAnswers}</> : <>0</>}</span>
          </div>
        </div>


        <div className='db-right'>
          <ResponsiveContainer>
            <BarChart data={dataChart} >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="red" />
              <Bar dataKey="Qs" fill="green" />
              <Bar dataKey="As" fill="blue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

  )
}
