import TitlePage from "@/components/title-page";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name={"description"}
          title={"description"}
          content={"Apa itu Pejuang Pemrograman?"}
        />
        <meta
          name={"og:title"}
          title={"og:title"}
          content={"About - Pejuang Pemrograman"}
        />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={"Apa itu Pejuang Pemrograman?"}
        />
        <meta
          name={"og:image"}
          title={"og:image"}
          content={"https://najikh2002.github.io/assets/pejuangp/cover.png"}
        />
      </Head>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <TitlePage title="About" />

        <div className="py-6 min-h-[75vh]">
          <p>
            Kenalin, kami Pejuang Pemrograman. <br />
            <br />
            Jadi gini, kami ini komunitas anak-anak tech yang suka ngoprek kode
            dan teknologi. Tapi tenang, kamu nggak harus jago dulu buat gabung.
            Malah, kami percaya siapa aja bisa belajar pemrograman. <br />
            <br />
            Di sini, nggak ada yang namanya &quot;pertanyaan bodoh&quot;. Mau
            tanya cara bikin &quot;Hello World&quot; atau diskusi tentang AI
            terbaru, semuanya welcome! Prinsip kami simpel: semua orang sama di
            sini. <br />
            <br />
            Kita semua punya sesuatu buat dibagiin, kan? Entah itu pengalaman
            debug sampai pagi atau trik coding yang bikin hidup lebih mudah.
            Nah, di Pejuang Pemrograman, kita saling berbagi dan belajar bareng.{" "}
            <br />
            <br />
            Intinya, kita pengen bikin komunitas yang asik buat belajar
            teknologi. Tempat di mana kamu bisa nanya apa aja tanpa takut
            dibilang noob, dan di mana kamu juga bisa pamer dikit kalau berhasil
            nyelesaiin proyek keren. <br />
            <br />
            Jadi, mau ikutan jadi pejuang? Yuk, gabung! Bareng-bareng kita
            taklukkan dunia teknologi, satu baris kode at a time. <br />
            <br />
            Pejuang Pemrograman: Di mana kita semua jadi guru sekaligus murid.
            Seru kan?
          </p>
        </div>
      </div>
    </>
  );
}
