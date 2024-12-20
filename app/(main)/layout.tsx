'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InfoBar from "../components/inforbar";
import Sidebar from "../components/sidebar";
import { Provider } from "react-redux";
import store from "../components/store";
import { FloatingDock } from "../components/navbar/mobilenav";
import Navbar from './../components/global/navbar';
import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import ModalProvider from "@/provider/model-provider";
import { Circles } from "react-loader-spinner";
import Head from 'next/head';
type Props = { children: React.ReactNode };


const Layout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true); // Loading state to prevent flickering
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/auth",
    },
 
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/home",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "connections",
    },
    {
      title: "Aceternity UI",
      icon: (
        <IconNewSection
          // src="https://assets.aceternity.com/logo-dark.png"
          // width={20}
          // height={20}
          // alt="Aceternity Logo"
        />
      ),
      href: "/menu",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  useEffect(() => {
    // Function to check the screen width and update state
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    // Set the initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Function to check if the user is authenticated (token in localStorage)
  const isAuthenticated = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return !!token; // Returns true if the token exists
    }
    return false;
  };

  useEffect(() => {
    // Redirect to /auth if not authenticated
    if (!isAuthenticated()) {
     
      router.push("/auth");
      setLoading(false);
    } else {
      setLoading(false); // Allow page to load if authenticated
    }
  }, [router]);

  // Show a loading state while checking authentication
  if (loading) {
    return <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 9999,
    }}
  >
    <Circles
      height="80"
      width="80"
      color="#BD8AFF"
      ariaLabel="loading-indicator"
    />
  </div>;
  }

  return (<>
   <Head>
        <title>app

          
        {/* Open Graph Image (for social media sharing) */}
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Favicon (using an image) */}
        {/* <link rel="icon" href="/favicon.ico" /> */}

        {/* Meta Tags for Better SEO */}
        </title>
        <meta name="description" content="This is a Next.js app with a custom logo" />
      </Head>
    <div className="flex overflow-hidden h-screen">
       <Provider store={store}>
        <ModalProvider>
     {/* {isAuthenticated()? */}  
     {!isMobileView ? (
       //  <div className="flex items-center justify-center h-[35rem] w-full">
       <Sidebar/>
       //  </div>
      ) : null}
      <div className="w-full">
        <InfoBar />
        {isMobileView ? (
          //  <div className="flex items-center justify-center h-[35rem] w-full">
          <FloatingDock items={links}/>
          //  </div>
        ) : null}
        {children}
        <div className="sticky-bottom  flex">

        </div>

      </div>
      </ModalProvider>
      </Provider>
    </div>
        </>
  );
};

export default Layout;
