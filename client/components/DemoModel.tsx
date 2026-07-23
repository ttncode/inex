import { GrClose } from "react-icons/gr";

export default function DemoModel({ setShowDemo }: any) {
  return (
    <section className="fixed top-0 left-0 w-screen h-screen bg-white text-black z-50">
      <div className="w-full flexEnd p-20 text-2xl">
        <div className="w-fit h-fit" onClick={() => setShowDemo(false)}>
          <GrClose width={50} height={50} />
        </div>
      </div>
      <div className="w-full px-20 text-center mt-10">
        <h1 className="text-4xl font-bold py-3">Under construction</h1>
        <p>This function is under construction. We will update as soon as possible.</p>
      </div>
      <div className="w-full text-center my-10">
        <button
          className="h-10 w-35 lg:bg-primary border-2 text-white hover:opacity-80"
          onClick={() => setShowDemo(false)}
        >
          OK
        </button>
      </div>
    </section>
  );
}
