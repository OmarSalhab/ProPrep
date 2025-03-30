import MultipleQ from "./MultipleQ";
import Navbar from "./Navbar";
import SidePanel from "./sidePanel";
import { useState, useMemo } from "react";
function Dashboard() {
	const [pageType, setPageType] = useState(0);
	const [showSidePanel, setShowSidePanel] = useState(true);
	const page = useMemo(() => {
		switch (pageType) {
			case 0:
				return <MultipleQ showSidePanel={showSidePanel} />;

			case 1:
				return <div>this is the page number 2</div>;

			case 2:
				return <div>this is the page number 3</div>;
		}
	}, [pageType, showSidePanel]);
	return (
		<>
			<Navbar />
			<SidePanel
				setPageType={setPageType}
				setShowSidePanel={setShowSidePanel}
				showSidePanel={showSidePanel}
			/>
			{page}
		</>
	);
}

export default Dashboard;
