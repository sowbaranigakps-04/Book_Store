import React, { use, useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Title from "../Components/Title";
const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () =>{
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', {variant : 'success'});

        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please Check Console');
        enqueueSnackbar('Error', {variant : 'error'});

        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <div className='text-corner py-8 text-2xl text-center'>
        <Title text1={'DELETE '} text2={'BOOK'} /></div>
        
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You Want to Delete this Book?</h3>
        <button className='p-4 bg-red-400 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>

      </div>
      
    </div>
  )
}

export default DeleteBook
