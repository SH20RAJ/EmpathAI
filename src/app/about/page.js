import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
                    <p className="text-xl text-gray-600">Discover the story behind our mission</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                    <p className="text-gray-600 mb-6">
                        We are passionate about creating innovative solutions that help people connect with music 
                        in meaningful ways. Our journey began with a simple idea: to make music discovery more 
                        personal and engaging.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600 mb-6">
                        To revolutionize the way people experience and discover music through cutting-edge 
                        technology and personalized recommendations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                        <p className="text-gray-600">Pushing boundaries with advanced technology solutions</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Passion</h3>
                        <p className="text-gray-600">Dedicated to creating the best music experience</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
                        <p className="text-gray-600">Building connections through shared love of music</p>
                    </div>
                </div>
            </div>
        </div>
    );
}