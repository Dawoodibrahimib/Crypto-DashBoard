import { BarLoader } from "react-spinners";


const overRide = {
    display:'block',
    margin:"0 auto"
}

const Spinner = ({color="blue",size="150"}) =>
{
    return(
        <div>
            <BarLoader
            color="blue"
            cssOverride={overRide}
            size={150}
            aria-label="loading Spinner"
            data-testid='loader'>

            </BarLoader>
        </div>

    )
}

export default Spinner;