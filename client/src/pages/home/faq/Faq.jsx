import React from 'react';

const Faq = () => {
    return (
        <div class="container mx-auto px-4 py-16">
            <h2 class="text-center text-4xl font-bold text-gray-800 mb-4">Frequently Asked Question (FAQ)</h2>
            <p class="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce
                pain, and strengthen your body with ease!
            </p>

            <div class="max-w-3xl mx-auto">
                <div class="collapse collapse-plus bg-base-100 mb-4 rounded-lg shadow-md border border-gray-200">
                    <input type="radio" name="my-accordion-3" checked />
                    <div class="collapse-title text-xl font-medium text-gray-700">
                        How does this posture corrector work?
                    </div>
                    <div class="collapse-content text-gray-600">
                        <p>A posture corrector works by providing subtle support and gentle alignment to your shoulders, back, and spine. It encourages you to maintain proper posture throughout the day by engaging your core and back muscles. Over time, this helps to retrain your body's muscle memory, making good posture feel more natural and effortless, ultimately reducing strain and improving overall spinal health.</p>
                    </div>
                </div>

                <div class="collapse collapse-plus bg-base-100 mb-4 rounded-lg shadow-md border border-gray-200">
                    <input type="radio" name="my-accordion-3" />
                    <div class="collapse-title text-xl font-medium text-gray-700">
                        Is it suitable for all ages and body types?
                    </div>
                    <div class="collapse-content text-gray-600">
                        <p>Posture Pro is designed with adjustability in mind to accommodate a wide range of ages and body types. It features adjustable straps and ergonomic designs to ensure a comfortable and effective fit for most individuals. We recommend checking the product specifications for exact sizing, and if you have specific medical conditions, consulting with a healthcare professional before use is always advised.</p>
                    </div>
                </div>

                <div class="collapse collapse-plus bg-base-100 mb-4 rounded-lg shadow-md border border-gray-200">
                    <input type="radio" name="my-accordion-3" />
                    <div class="collapse-title text-xl font-medium text-gray-700">
                        Does it really help with back pain and posture improvement?
                    </div>
                    <div class="collapse-content text-gray-600">
                        <p>Yes, many users experience significant relief from back pain and noticeable improvements in their posture with consistent use of a posture corrector. By gently pulling your shoulders back and aligning your spine, it reduces slouching and the associated strain on your back muscles. This can alleviate existing pain and prevent future discomfort, while actively training your body to maintain a more upright and healthy posture.</p>
                    </div>
                </div>

                <div class="collapse collapse-plus bg-base-100 mb-4 rounded-lg shadow-md border border-gray-200">
                    <input type="radio" name="my-accordion-3" />
                    <div class="collapse-title text-xl font-medium text-gray-700">
                        Does it have smart features like vibration alerts?
                    </div>
                    <div class="collapse-content text-gray-600">
                        <p>Our premium Posture Pro models do include smart features such as gentle vibration alerts. These alerts activate when you start to slouch, providing a subtle reminder to correct your posture without being disruptive. This intelligent feedback helps reinforce good postural habits throughout your day, making the correction process more effective and interactive.</p>
                    </div>
                </div>

                <div class="collapse collapse-plus bg-base-100 mb-4 rounded-lg shadow-md border border-gray-200">
                    <input type="radio" name="my-accordion-3" />
                    <div class="collapse-title text-xl font-medium text-gray-700">
                        How will I be notified when the product is back in stock?
                    </div>
                    <div class="collapse-content text-gray-600">
                        <p>To be notified when Posture Pro is back in stock, we recommend signing up for our email newsletter on the product page. Simply enter your email address in the designated field, and we will send you an immediate notification as soon as the item becomes available for purchase again. You can also follow our social media channels for updates on restocks and new product releases.</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-10">
                <button class="btn bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold py-3 px-6 rounded-md shadow-lg flex items-center mr-4">
                    See More FAQ's
                </button>
                <button class="btn bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md shadow-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Faq;