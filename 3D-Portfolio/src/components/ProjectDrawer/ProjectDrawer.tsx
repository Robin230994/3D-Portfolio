interface IProjectDrawer {
	selectedProject: string;
	selectedProjectHeading: string;
	selectedProjectText: string;
	selectedProjectTags: Array<string>;
	selectedProjectImage?: string;
}

const ProjectDrawer: React.FC<IProjectDrawer> = ({
	selectedProject,
	selectedProjectHeading,
	selectedProjectText,
	selectedProjectTags,
	selectedProjectImage,
}) => {
	return (
		<aside className="project-drawer">
			<div className="project-drawer-header">
				<span>Selected Object · {selectedProject}</span>
				<h1>{selectedProjectHeading}</h1>
			</div>
			<div className="project-drawer-main">
				<p>{selectedProjectText}</p>
				{selectedProjectImage && <img src={selectedProjectImage} />}
				{selectedProjectTags.map((tag, index) => {
					return (
						<div key={index} className="project-tag">
							<p>{tag}</p>
						</div>
					);
				})}
			</div>
			<div className="project-drawer-footer">
				<button className="project-drawer-close">Close</button>
			</div>
		</aside>
	);
};

export default ProjectDrawer;
