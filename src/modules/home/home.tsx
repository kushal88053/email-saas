import Header from "@/shared/widgets/header/header"
import Banner from "./elements/banner";
import Branding from "./elements/branding";
import Banefits from "./elements/benefits";
import FeatureHighlight from "./elements/highlisht.tsx";
import Pricing from "./elements/pricing";
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
