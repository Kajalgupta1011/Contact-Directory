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

const Form: React.FC = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be minimum 2')
      .max(100, 'Name must not be more than 100 characters')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone is required'),
    company: Yup.string()
      .min(2, 'company must be minimum 2')
      .max(100, 'company must not be more than 100 characters')
      .required('company is required'),
    title: Yup.string()
      .min(2, 'title must be minimum 2')
      .max(100, 'title must not be more than 100 characters')
      .required('title is required'),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const allDetails = await fetch('/api/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!allDetails.ok) {
        throw new Error('Failed to insert the data');
      }
      alert('Created a Contact Successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the contact.');
    }
  };

  const formik = useFormik({
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
      <p className='text-[#6F6C90] text-center'>Fill out the below form to add new member</p>
      <form className='mt-8' onSubmit={formik.handleSubmit}>
        {/* name field  */}
        <div className='flex flex-col gap-3 pb-4'>
          <label htmlFor="name">Name</label>
          <div className="pb-3">
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder='Angela Moss'
              className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
        </div>
        {/* email field  */}
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
                placeholder='Email address'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
          </div>

          {/* for phone field */}
          <div className="flex flex-col gap-3 pb-4">
            <label htmlFor="phone">Phone</label>
            <div className="pb-3">
              <input
                type="number"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder='(123) 456 - 7890'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error text-red-500 text-sm">{formik.errors.phone}</div>
              )}
            </div>
          </div>
        </div>

        {/* company field  */}
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
                placeholder='Company name'
                className='px-4 py-3 w-full border shadow-sm shadow-[#13124212] border-[#EFF0F6] rounded-3xl focus:outline-none'
              />
              {formik.touched.company && formik.errors.company && (
                <div className="error text-red-500 text-sm">{formik.errors.company}</div>
              )}
            </div>
          </div>
          {/* title field  */}
          <div className="flex flex-col gap-3 pb-4">
            <label className='font-bold ' htmlFor="title">Title</label>
            <div className='pb-3'>
              <input
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
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
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
};

export default Form;