import FlexboxPlayground from "@/components/FlexboxPlayground";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-8xl px-10 mx-auto mt-4">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-1.5">
          Belajar FlexBox Interaktif
        </h1>
        <p className="text-xs font-normal text-center mb-1.5">Nextjs, TailwindCSS, Typescript, FramerMotion</p>
        <FlexboxPlayground />
      </div>
    </main>
  );
}