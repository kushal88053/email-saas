import Header from "@/shared/widgets/header/header"
import Banner from "./features/banner";
import Branding from "./features/branding";
import Banefits from "./features/benefits";
import FeatureHighlight from "./features/highlisht.tsx";
import Pricing from "./features/pricing";
import Footer from "@/shared/widgets/footer";

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Branding />
            <Banefits />
            <FeatureHighlight />
            <Pricing />
            <Footer />
        </div>
    )
}

export default Home 
