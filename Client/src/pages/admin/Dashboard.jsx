import React from 'react';
import "./style.scss"


const Dashboard = ({slider}) => {
  return (
    <>
      <div id="dashboard" className='content-admin' style={{marginLeft:slider && '28%'}}>
        <p >Welcome to your dashboard</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi rerum eum nulla eos nam temporibus, deleniti quos molestias veniam? Temporibus deserunt quae, quis laudantium numquam exercitationem eos beatae in. Eligendi sequi quisquam tempora cupiditate molestias blanditiis veniam voluptates quia vitae eveniet fuga excepturi non qui, placeat perferendis exercitationem vel laboriosam?</p>
      </div>
    </>
  )
}

export default Dashboard
