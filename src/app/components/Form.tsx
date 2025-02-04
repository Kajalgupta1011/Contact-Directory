'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
}

interface FormProps {
  handleModal: () => void;
}

const Form: React.FC<FormProps> = ({ handleModal }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be minimum 2 characters')
      .max(100, 'Name must not be more than 100 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone is required'),
    company: Yup.string()
      .min(2, 'Company must be minimum 2 characters')
      .max(100, 'Company must not be more than 100 characters')
      .required('Company is required'),
    title: Yup.string()
      .min(2, 'Title must be minimum 2 characters')
      .max(100, 'Title must not be more than 100 characters')
      .required('Title is required'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to insert the data');
      }
      alert('Created a Contact Successfully!');      
      // formik.resetForm();
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the contact.');
    }
    console.log(JSON.stringify(values));
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      title: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className='bg-white text-[#202020] max-w-[808px] p-16 text-md rounded-3xl shadow-lg shadow-[#080F340F]'>
      <h1 className='font-bold text-center text-3xl mb-2'>Add New Contact</h1>
      <p className='text-[#6F6C90] text-center'>Fill out the form below to add a new member</p>
      <form className='mt-8' onSubmit={formik.handleSubmit}>
        {/* Name field */}
        <div className='flex flex-col gap-3 pb-4'>
          <label htmlFor="name">Name</label>
          <div className="pb-3">
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Angela Moss'
              className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
        </div>
        {/* Email & Phone fields */}
        <div className='grid grid-cols-2 gap-8'>
          <div className="flex flex-col gap-3 pb-4">
            <label htmlFor="email">Email</label>
            <div className="pb-3">
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Email address'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-4">
            <label htmlFor="phone">Phone</label>
            <div className="pb-3">
              <input
                type="number"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='(123) 456 - 7890'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error text-red-500 text-sm">{formik.errors.phone}</div>
              )}
            </div>
          </div>
        </div>
        {/* Company & Title fields */}
        <div className='grid grid-cols-2 gap-8'>
          <div className="flex flex-col gap-3 pb-4">
            <label htmlFor="company">Company</label>
            <div className="pb-3">
              <input
                type="text"
                id="company"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Company name'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.company && formik.errors.company && (
                <div className="error text-red-500 text-sm">{formik.errors.company}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 pb-4">
            <label htmlFor="title" className='font-bold'>Title</label>
            <div className="pb-3">
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Marketing Manager'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.title && formik.errors.title && (
                <div className="error text-red-500 text-sm">{formik.errors.title}</div>
              )}
            </div>
          </div>
        </div>
        <div className='flex gap-4 justify-center'>
          <button
            type="submit"
            className="p-5 font-bold rounded-xl text-white min-w-[130px] border border-transparent bg-[#6418C3]"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="p-5 text-[#6418C3] font-bold rounded-xl min-w-[130px] border border-[#6418C3]"
            onClick={handleModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
