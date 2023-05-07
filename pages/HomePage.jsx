import React from 'react'
import { useQuery } from 'react-query'

function HomePage() {

    const { data, isLoading, isError } = useQuery("components", () =>
        fetch("http://localhost:4000/api/home-pages?populate[0]=Dynamic.Service.Image")
            .then((response) => response.json())
            .then((data) => data.data)
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching components</div>;
    }

    return (
        <div>
            {data.map((components) => {
                return (
                    <div key={components.id}>
                        {(components.attributes.Dynamic).map((component) => {
                            if (component.__component == "categories.list-services") {
                                return (<div key={component.id} className='flex flex-row flex-wrap justify-center gap-10'>
                                    {component.Service.map((item) => {
                                        const imageUrl = item.Image.data.attributes.url
                                        return (<div key={item.id} >
                                            <img src={`http://localhost:4000${imageUrl}`} alt={item.Service} className='images' />
                                            <h4 className='uppercase text-center font-medium'>{item.Service}</h4>
                                        </div>)

                                    })}
                                </div>);

                            } else if (component.__component == "summary.summary") {
                                return (<div key={component.id} >
                                    <p className='w-2/3 m-auto my-10'>
                                        {component.Description}
                                    </p>
                                </div>);
                            }
                        })}
                    </div>)
            })
            }
        </div>
    );

    /*    return (
            <div>
                {console.log(data[1].__component)}
                {data.map((component) => {
                    if (component.__component == "categories.services") {
                        return (<div key={component.id}>
                            {}
                        </div>);
    
                    } else if (component.__component == "summary.summary") {
                        return (<div key={component.id}>
                            <p className='w-2/3 m-auto my-10'>
                                {component.Description}
                            </p>
                        </div>);
                    }
                })}
            </div>
        );
        /*   return (
               <main className='py-5'>
                   <div>
                       <p className='w-2/3 m-auto my-10'>
                           WE ARE A FAMILY BUSINESS CREATED WITH THE PURPOSE OF DESIGNING THE SPACES AND ADVICE FOR HOME, FOCUSING
                           ON COMFORT AND ELEGANCE, SO YOU HAVE A UNIQUE EXPERIENCE.
                       </p>
                   </div>
       
                   <div className='flex flex-row flex-wrap justify-center gap-10'>
                       <div >
                           <img src="/images/img4.jpg" alt="living room" className='images' />
                           <h4 className='uppercase text-center font-medium'>living room</h4>
                       </div>
                       <div >
                           <img src="/images/img5.jpg" alt="dining room" className='images' />
                           <h4 className='uppercase text-center font-medium'>dining room</h4>
                       </div>
                       <div >
                           <img src="/images/img1.jpg" alt="main room" className='images' />
                           <h4 className='uppercase text-center font-medium'>main room</h4>
                       </div>
                       <div >
                           <img src="/images/img3.jpg" alt="mirrors" className='images' />
                           <h4 className='uppercase text-center font-medium'>mirrors</h4>
                       </div>
                       <div >
                           <img src="/images/img2.jpg" alt="home accesories" className='images' />
                           <h4 className='uppercase text-center font-medium'>home accesories</h4>
                       </div>
                   </div>
               </main>
           )*/
}

export default HomePage;
