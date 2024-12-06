import { Navbar } from '@components/navbar'
import { notFound } from 'next/navigation';
import { backend } from '@/utils/config';
import Link from 'next/link';
import StaffList from '@/components/StaffList';

interface TInstitute {
  ins_id: string;
  name: string;
  website: string | null;
  address: string | null;
  logo_url: string | null;
  founded_year: number | null;
  phone_number: string | null;
  mail: string | null;
};

interface TStaff {
  name: string;
  department: string | null;
  designation: string | null;
  email: string | null;
  google_scholer_id: string | null;
  h_index: number | null;
  hashed_password: string | null;
  institution: string | null;
  layout: string | null;
  linked_in: string | null;
  phone_number: string | null;
  profile_picture: string | null;
  staff_id: string | null;
  total_citation: string | null;
};

async function get_staffs(id: string) {
  try {
    let res = await fetch(`${backend}/api/v1/institutions/get-all-staffs/${id}`, {
      cache: 'force-cache',
    })

    let data: TStaff[] = (await res.json()).UserData;
    if (!data) notFound()
    return data 
  } catch (e) {
    notFound();
  }
};

async function get_institute(id: string) {
  try {
    let res = await fetch(`${backend}/api/v1/institutions/get-institute/${id}`, {
      cache: 'force-cache',
    })

    let data: TInstitute = (await res.json()).data
    if (!data) notFound()
    return data 
  } catch (e) {
    notFound();
  }
};

export async function generateStaticParams() {
  let institutions = await fetch(`${backend}/api/v1/institutions/get-all`, {
    cache: 'force-cache',
  }).then((res) => res.json())
 
  return institutions.data.map((institute: TInstitute) => ({
    id: institute.ins_id,
  }))
}

export default async function Home ({ params, }: { params: Promise<{ institution_id: string }> }) {
    const { institution_id } = await params;
    const institution = await get_institute(institution_id)
    const staffs = await get_staffs(institution_id)

    console.log(institution);
    console.log(staffs);

    return (
      <main className='h-screen'>
        <Navbar />

        <section className='bg-green-100 h-48 flex justify-end'>
          <section className='h-32 w-32 bg-blue-400 relative top-20 right-20'></section>
        </section>

        <section className='px-24 p-8'>
          <section className='flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>{institution.name}</h1>
            <h1>T F I</h1>
          </section>
          <h3 className='text-md'>Address, Chennai{institution?.address}</h3>
          <p className='mt-8'>Velit magna proident eiusmod commodo nisi ea. Cillum ad excepteur officia dolore consequat commodo deserunt labore non in amet Lorem nulla. Tempor esse cillum ut quis incididunt aliquip nulla ex aliquip ad in mollit officia. Minim ullamco magna commodo culpa. Officia nisi et qui Lorem minim aliqua laboris amet veniam. Elit occaecat enim minim fugiat ad commodo nisi aliquip enim duis non mollit esse eu.</p>

          <h1 className='text-xl font-bold pt-5'>Contact Information</h1>
          <p>Email: {institution.mail}</p>
          <p>Phone Number: {institution.phone_number}</p>
          <p>Website: {institution.website}</p>
        </section>

        <StaffList staff_prop={staffs} />

        {/*
        */}
        <section className='h-28'></section>

      </main>
    )
}
