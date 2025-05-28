import { Appbar } from "../components/Dashboard/Appbar"
import { Balance } from "../components/Dashboard/Balance"
import { Users } from "../components/Dashboard/User"

export const Dashboard = () => {
    return <div>
        <Appbar label={"user"} />
        <div className="m-8">
            <Balance value={123} />
            <Users />
        </div>

    </div>
}