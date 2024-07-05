import Link from "next/link";

export default function LogoHeader() {
  return (
    <div>
      <Link href="/" className="flex justify-center items-center gap-3">
        <svg
          className="dark:hidden"
          width="60"
          height="20"
          viewBox="0 0 60 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.2075 4.60377L21.434 0H0L12.5283 13.3585H22.2642L27.4717 20V8.37736H14.717L11.0189 4.60377H25.2075Z"
            fill="black"
          />
          <path
            d="M33.811 4.60377L37.5846 0H59.0186L46.4903 13.3585H36.7544L31.5469 20V8.37736H44.3016L47.9997 4.60377H33.811Z"
            fill="black"
          />
        </svg>

        <svg
          className="hidden dark:block"
          width="60"
          height="20"
          viewBox="0 0 60 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.2075 4.60377L21.434 0H0L12.5283 13.3585H22.2642L27.4717 20V8.37736H14.717L11.0189 4.60377H25.2075Z"
            fill="white"
          />
          <path
            d="M33.811 4.60377L37.5846 0H59.0186L46.4903 13.3585H36.7544L31.5469 20V8.37736H44.3016L47.9997 4.60377H33.811Z"
            fill="white"
          />
        </svg>

        <h3 className="hidden md:block text-[20px] font-bold">
          PejuangPemrograman
        </h3>
      </Link>
    </div>
  );
}
