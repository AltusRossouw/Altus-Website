import dynamic from 'next/dynamic';

const JellySlider = dynamic(() => import('@/components/JellySlider/JellySlider'), {
    ssr: false,
});

export default function JellySliderPage() {
    return (
        <main className="w-full h-screen overflow-hidden">
            <JellySlider />
        </main>
    );
}
