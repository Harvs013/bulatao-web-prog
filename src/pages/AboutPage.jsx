import Button from '../components/Button';
import blackpinkcover from '../assets/blackpinkcover.jpg';
import JENNIE from '../assets/JENNIE.jpg';
import JISOO from '../assets/JISOO.jpg';
import LISA from '../assets/LISA.jpg';
import ROSE from '../assets/ROSE.jpg';

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-pink-300 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-pink-200 p-6">
                        <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-900">
                            <img
                                src={blackpinkcover}
                                alt="BLACKPINK"
                                className="w-full h-full max-h-[400px] object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            About PINKS
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            BLACKPINK IN YOUR AREA!
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-700 sm:text-base">
                            DEBUT 2019.02.09
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3 justify-center">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                            <Button to="/articles">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-pink-300 px-4 py-6 sm:px-6 sm:-py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Achievement and Awards
                    </p>
                </div>

                <div className="grid-gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-700">40th Golden Disc Awards [Best Digital Song]</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            2026
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-700">RIAA GOLD Certification</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            2025
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-700">Asia Artist Awards 2025 [10 LEGENDARY FEMALE GROUP]</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            2025
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-700">
                            12th Circle Chart Music Awards [Girl Group of the Year, Digital Music Division Artist of the Year(September), Digital Music Division Artist of the Year(August), Mubeat Global Choice Awards Female Division]</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                            2023
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-pink-300 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            SPOTIFY
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                            MOST STREAMS SONGS
                        </h2>

                        <div className="mt-6 space-y-4">
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    PRETTY SAVAGE
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    1 billion streams
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    HOW YOU LIKE THAT
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    820 million streams
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    KILL THIS LOVE
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    727 million streams
                                </p>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Visuals
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src={JENNIE}
                                    alt="JENNIE"
                                    className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src={JISOO}
                                    alt="JISOO"
                                    className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src={ROSE}
                                    alt="ROSE"
                                    className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img
                                    src={LISA}
                                    alt="LISA"
                                    className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;