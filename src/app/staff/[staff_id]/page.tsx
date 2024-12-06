import { Navbar } from "@/components/navbar";
import { LinePlot } from "@/components/lineplot";
import { AreaChart } from "@/components/area";
import { DonutChart } from "@/components/donut";
import { PublicationGraph } from "@/components/indgraph";
import { notFound } from "next/navigation";
import { backend } from "@/utils/config";

interface TStaffProfile {
  staff_id: string;
  name: string;
}

async function get_staff_profile(id: string) {
  try {
    let res = await fetch(`${backend}/api/v1/staffs/get-staff-id/${id}`, {
      cache: "force-cache",
    });

    let data: TStaffProfile[] = await res.json();
    if (!data) notFound();
    return data;
  } catch (e) {
    notFound();
  }
}

async function get_staff_publications(id: string) {
  try {
    let res = await fetch(
      `${backend}/api/v1/staffs/get-staff-publication/${id}`,
      {
        cache: "force-cache",
      },
    );

    let data: TStaffProfile[] = await res.json();
    if (!data) notFound();
    return data;
  } catch (e) {
    notFound();
  }
}

export default async function Home({ params, }: { params: Promise<{ staff_id: string }>; }) {
  const { staff_id } = await params;
  const staff_profile = await get_staff_profile(staff_id);
  const staff_publications = await get_staff_publications(staff_id);

  const data = {
    name: "John Doe",
    department: "Computer Science",
    institution: "Mike Oxlong University of Technology",
    gs_link: "https://scholar.google.com/citations?user=123456",
    linkedin: "https://linkedin.com/in/johndoe",
    research_gate: "https://researchgate.net/profile/johndoe",
  };

  const chartData = [
    { year: 2015, citations: 5 },
    { year: 2016, citations: 15 },
    { year: 2017, citations: 10 },
    { year: 2018, citations: 20 },
    { year: 2019, citations: 25 },
    { year: 2020, citations: 30 },
  ];

  const areadata = [
    { year: "2018", category: "Journals", value: 5 },
    { year: "2018", category: "Conference", value: 9 },
    { year: "2018", category: "Books", value: 3 },
    { year: "2018", category: "Patents", value: 0 },
    { year: "2019", category: "Journals", value: 10 },
    { year: "2019", category: "Conference", value: 2 },
    { year: "2019", category: "Books", value: 1 },
    { year: "2019", category: "Patents", value: 2 },
    { year: "2020", category: "Journals", value: 5 },
    { year: "2020", category: "Conference", value: 15 },
    { year: "2020", category: "Books", value: 20 },
    { year: "2020", category: "Patents", value: 1 },
    { year: "2021", category: "Journals", value: 20 },
    { year: "2021", category: "Conference", value: 10 },
    { year: "2021", category: "Books", value: 5 },
    { year: "2021", category: "Patents", value: 5 },
    { year: "2022", category: "Journals", value: 40 },
    { year: "2022", category: "Conference", value: 30 },
    { year: "2022", category: "Books", value: 20 },
    { year: "2022", category: "Patents", value: 10 },
    { year: "2023", category: "Journals", value: 50 },
    { year: "2023", category: "Conference", value: 40 },
    { year: "2023", category: "Books", value: 25 },
    { year: "2023", category: "Patents", value: 15 },
    { year: "2024", category: "Journals", value: 6 },
    { year: "2024", category: "Conference", value: 4 },
    { year: "2024", category: "Books", value: 3 },
    { year: "2024", category: "Patents", value: 2 },
  ];

  const publicationData = [
    { category: "SCI", value: 152 },
    { category: "SCOPUS", value: 198 },
    { category: "ESCI", value: 206 },
    { category: "Others", value: 100 },
  ];

  const indexdata = [
    { year: 2015, SCI: 10, SCOPUS: 15, ESCI: 2 },
    { year: 2016, SCI: 12, SCOPUS: 18, ESCI: 22 },
    { year: 2017, SCI: 15, SCOPUS: 20, ESCI: 25 },
    { year: 2018, SCI: 18, SCOPUS: 23, ESCI: 8 },
    { year: 2019, SCI: 20, SCOPUS: 25, ESCI: 3 },
    { year: 2020, SCI: 12, SCOPUS: 27, ESCI: 32 },
    { year: 2021, SCI: 2, SCOPUS: 3, ESCI: 15 },
    { year: 2022, SCI: 8, SCOPUS: 2, ESCI: 18 },
    { year: 2023, SCI: 10, SCOPUS: 35, ESCI: 30 },
    { year: 2024, SCI: 12, SCOPUS: 37, ESCI: 22 },
  ];

  return (
    <main className="flex flex-col w-full min-h-screen p-2">
      <Navbar />
      <section className="flex flex-row items-center justify-between w-full">
        <section className="flex flex-row items-center justify-between w-3/4 ">
          <section className="flex flex-row items-center">
            <div className="w-32 h-32 rounded-full bg-sky-100"></div>
            <section className="flex flex-col ml-5">
              <h1 className="text-4xl font-bold">{data.name}</h1>
              <p className={`${data.department ? "text-lg" : "hidden"}`}>
                {" "}
                {data.department}{" "}
              </p>
              <p className="text-lg">{data.institution}</p>
            </section>
          </section>
          <section className="flex flex-col ml-5 text-right">
            <a
              href={data.gs_link}
              className="text-lg hover:underline hover:text-[#9888FF]"
            >
              Google Scholar
            </a>
            <a
              href={data.linkedin}
              className="text-lg hover:underline hover:text-[#9888FF]"
            >
              LinkedIn
            </a>
            <a
              href={data.research_gate}
              className="text-lg hover:underline hover:text-[#9888FF]"
            >
              Research Gate
            </a>
          </section>
        </section>
        <section className="flex justify-center w-1/4">
          <LinePlot data={chartData} width={250} height={200} />
        </section>
      </section>
      <section className="border-black border-2 w-3/4 h-1/2 mt-5">
        <DonutChart data={publicationData} />
      </section>
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">Publications Overview</h1>
        <AreaChart data={areadata} width={500} height={300} />
        <PublicationGraph data={indexdata} width={800} height={500} />
      </section>
    </main>
  );
}
