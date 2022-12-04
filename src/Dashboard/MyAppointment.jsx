import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const MyAppointment = () => {
    const {user}= useContext(AuthContext)
    const url =`http://localhost:5000/bookings?email=${user?.email}`

    const {data: bookings =[],}=useQuery({
        queryKey:['bookings', user?.email],
        queryFn: async ()=>{
            const res= await fetch(url,{
            headers:{
                   authorization:`bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const  data = await res.json();
            console.log(data);
            return data

        }
        
        
    })
    return (
        <div>
            <h3 className="text-3xl">My Appointment</h3>
            <div className="overflow-x-auto">
  <table className="table mt-9  w-full">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Treatment</th>
        <th>Date</th>
        <th>Time</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
      {bookings?.length &&
        bookings?.map((booking,i)=><tr>
            <th>{i+1}</th>
            <td>{booking?.patient}</td>
            <td>{booking?.patientTreatment}</td>
            <td>{booking?.appointmentDate}</td>
            <td>{booking?.slot}</td>
            <td>
            {
              booking?.price && !booking?.paid && <Link
              to={`/dashboard/payment/${booking._id}`}
              >
              <button className='btn  text-center btn-primary btn-sm'>
                Pay
              </button>
              </Link>
            }{
              booking?.price && booking?.paid && <span className='text-green-500  text-center'>Paid</span>
            }
            </td>
          </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointment;