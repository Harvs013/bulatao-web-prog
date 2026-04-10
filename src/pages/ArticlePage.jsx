import Button from '../components/button';
import bpbp from '../assets/bpbp.jpg';
import LALISA from '../assets/LALISA.jpg';
import musicbank from '../assets/musicbank.jpg';
import blackpinkcover from '../assets/blackpinkcover.jpg';
import bpcovs from '../assets/bpcovs.jpg';

const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-pink-300 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-700">
                    Articles
                </p>
                <img
                    src={bpcovs}
                    alt="bpcovs"
                    className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                />
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-700">
                    BLACKPINK TO BLINKS: A JOURNEY THROUGH THE YEARS
                </p>
                <div className="mt-6 ">
                    <Button to="/"  >Back Home</Button>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        WHAT HAPPENED TO PINKS?
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Articles about PINKS.
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-pink-300 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src={bpbp}
                                alt="bpbp"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                            />
                        </div>
                        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-700">
                            BLACKPINK’s latest single ‘Pink Venom’ has been deemed unfit for broadcast by South Korean broadcasters KBS.
                        </p>
                        
                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                            KBS (Korean Broadcasting System) has removed BLACKPINK’s recent single ‘Pink Venom’ from rankings on its weekly music programme Music Bank. 
                            According to a previously-released evaluation report by the broadcaster, per KoreaJoongAng Daily, KBS had deemed the track unsuitable for broadcast 
                            due to its lyrics.
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-pink-300 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src={LALISA}
                                alt="LALISA"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                            />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
                            Lisa secured her first-ever music show win as a soloist for her debut single "LALISA" on KBS's Music Bank.
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                             This win was notable as it was achieved just a week after the single's release, 
                             with the high broadcast score overcoming lower digital points, demonstrating strong initial buzz and support.
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-pink-300 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src={musicbank}
                                alt="Music Bank"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                            />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
                            'Music Bank' chart blunder, apology: EXO-SC now named winner over BLACKPINK
                        </p>
                        
                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                            KBS program “Music Bank” has apologized after making an error in the rankings of its weekly chart released on July 24.
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-pink-300 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img
                                src={blackpinkcover}
                                alt="BLACKPINK"
                                className="w-full h-full max-h-[400px] object-cover rounded-2xl"
                            />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
                            BLACKPINK become first K-pop girl group to perform at Coachella
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                            Coachella, the annual music and arts festival in the Californian desert, has become something of a cultural 
                            phenomenon over the years.
                            And, this year's no different with the buzz on what's happening on - and off - stage.
                            Firstly, there's BLACKPINK who've made history by being the first K-pop girl band to perform there.
                        </p>
                        <Button className="mt-4">Read More</Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;