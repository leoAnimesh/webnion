import useReduxValues from "@/hooks/redux/useReduxValues"

const Navbar = () => {
    const { workspace } = useReduxValues();
    console.log(workspace);

    return (
        <nav id="native-titlebar" className="flex sticky top-0 w-full flex-1 justify-center items-center py-2 " >
            <p className="text-xs text-center">Webnion {workspace.name !== '' ? `- ${workspace.name}` : ''}</p>
        </nav>
    )
}

export default Navbar