import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {

    const [title, setTitle] = useState('')
    const [auther, setAuther] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((res) => {
                setTitle(res.data.title)
                setAuther(res.data.auther)
                setPublishYear(res.data.publishYear)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);

            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            auther,
            publishYear
        };

        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Updated Successfully', { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                setLoading(false)
                alert('An error Happened, please check console')
                enqueueSnackbar('Error', { variant: 'error' })
                console.log(error);

            })
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {
                loading ? <Spinner /> : ''
            }
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className='border-2 border-gray-500 font-semibold rounded-lg px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Auther</label>
                    <input type="text" value={auther} onChange={(e) => { setAuther(e.target.value) }} className='border-2 border-gray-500 font-semibold rounded-lg px-4 py-2 w-full' />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => { setPublishYear(e.target.value) }} className='border-2 border-gray-500 font-semibold rounded-lg px-4 py-2 w-full' />
                </div>
                <button className='p-2 bg-sky-400 m-8 font-bold text-white rounded-lg' onClick={handleEditBook}>Save</button>
            </div>
        </div>
    )
}

export default EditBook