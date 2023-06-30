import Head from "next/head";
import Card from "./Component/card";
import NavigationBar from "./Component/nav";

const Home = () => {
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head>
        <title>Carefinder | Find Hospitals Real Quick</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <NavigationBar />
        <Card />
      </div>
    </div>
  );
};

export default Home;
