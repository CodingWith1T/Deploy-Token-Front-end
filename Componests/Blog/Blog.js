"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

const Blog = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch testimonials from the API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("https://blog.deploytokens.com/api/blog.php/post_url");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data && Array.isArray(data)) {
                    setTestimonials(data);
                } else {
                    throw new Error("Invalid data format.");
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Handle carousel navigation
    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, Math.floor(testimonials.length / 3)));
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Group testimonials into batches of 3
    const groupedTestimonials = [];
    for (let i = 0; i < testimonials.length; i += 4) {
        groupedTestimonials.push(testimonials.slice(i, i + 4));
    }

    if (loading) {
        return <>
            <div className="spinner-overlay">
                <BeatLoader color="#3498db" loading={loading} size={30} />
            </div>
            <div className="blurred-background"></div>
        </>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <section className="blogpage bloghome">
                <div className="container">
                    <h1>Resources</h1>
                    {groupedTestimonials[currentIndex] && (
                        <div className="row">
                            {groupedTestimonials[currentIndex].map((Blog, index) => (
                                <div key={index} className="col-lg-3 mb-5">
                                    <div className="card h-100 border-0">
                                        <img className="card-img-top" src={Blog.thumbnail}
                                            alt={Blog.title} />
                                        <div className="card-body p-4">
                                            <div className="badge bg-primary bg-gradient rounded-pill mb-2">{new Date(Blog.date).toLocaleDateString()}</div>
                                            <Link target="_blank" className="text-decoration-none link-dark stretched-link" href={Blog.post_url} >
                                                <div className="h5 card-title mb-3">{Blog.title}</div>
                                                <p>{Blog.description} Read more</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* <div className="d-flex item-center justify-center mb-4">
                        <button
                            onClick={prevTestimonial}
                            className="flex carousel-control-prev position-relative bg-black text-white px-4 py-2 rounded-full mx-4"
                        >
                            Prev
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="flex carousel-control-next position-relative bg-black text-white px-4 py-2 rounded-full mx-4"
                        >
                            Next
                        </button>
                    </div> */}


                </div>
            </section>
        </>
    );
};

export default Blog;
