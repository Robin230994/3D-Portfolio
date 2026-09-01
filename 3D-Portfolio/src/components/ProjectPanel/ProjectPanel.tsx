import { IProjectDescription } from "../../interfaces/GLlnterfaces";
import { useEffect, useRef } from "react";
import { useProjectPanelStore } from "../../Stores/useProjectPanelStore";

interface IProjectPanel {
	project: IProjectDescription;
}

const ProjectPanel: React.FC<IProjectPanel> = ({ project }) => {
	const mainPanelRef = useRef<HTMLDivElement>(null);
	const panelClosed = useProjectPanelStore((state) => state.panelClosed);
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);

	const handleClose = () => setPanelClosed(true);

	useEffect(() => {
		const panel = mainPanelRef.current;
		if (!panel) return;

		let frameId = 0;
		let previousTime = 0;
		let pauseUntil = 0;
		let virtualScrollTop = panel.scrollTop;
		let syncFrameId = 0;

		const pauseAutoScroll = () => {
			pauseUntil = performance.now() + 1500;

			window.cancelAnimationFrame(syncFrameId);
			syncFrameId = window.requestAnimationFrame(() => {
				virtualScrollTop = panel.scrollTop;
			});
		};

		const syncManualScroll = () => {
			if (performance.now() < pauseUntil) {
				virtualScrollTop = panel.scrollTop;
			}
		};

		panel.addEventListener("wheel", pauseAutoScroll, { passive: true });
		panel.addEventListener("touchstart", pauseAutoScroll, { passive: true });
		panel.addEventListener("pointerdown", pauseAutoScroll);
		panel.addEventListener("scroll", syncManualScroll, { passive: true });

		const autoScroll = (time: number) => {
			const maxScrollTop = panel.scrollHeight - panel.clientHeight;

			if (maxScrollTop <= 0) {
				virtualScrollTop = 0;
				pauseUntil = 0;
			} else if (previousTime && time >= pauseUntil) {
				const elapsedSeconds = (time - previousTime) / 1000;
				virtualScrollTop += elapsedSeconds * 8;

				if (virtualScrollTop >= maxScrollTop) {
					virtualScrollTop = maxScrollTop;
					panel.scrollTop = maxScrollTop;
					panel.scrollTo({ top: 0, behavior: "smooth" });
					virtualScrollTop = 0;
					pauseUntil = time + 800;
				}

				panel.scrollTop = virtualScrollTop;
			}

			previousTime = time;
			frameId = window.requestAnimationFrame(autoScroll);
		};

		frameId = window.requestAnimationFrame(autoScroll);
		return () => {
			window.cancelAnimationFrame(frameId);
			window.cancelAnimationFrame(syncFrameId);
			panel.removeEventListener("wheel", pauseAutoScroll);
			panel.removeEventListener("touchstart", pauseAutoScroll);
			panel.removeEventListener("pointerdown", pauseAutoScroll);
			panel.removeEventListener("scroll", syncManualScroll);
		};
	}, [project]);

	return (
		<aside className={`project-panel${panelClosed ? " project-panel--closing" : ""}`}>
			<div className="project-panel-header">
				<span>Gewähltes Projekt · {project.projectName}</span>
				<h1>{project.heading}</h1>
			</div>
			<div className="project-panel-main">
				<div className="project-media">{project.images && project.images.length > 0 && <img src={project.images[0].src} alt={project.images[0].alt} />}</div>
				<div ref={mainPanelRef} className="project-description">
					<p>{project.text}</p>
				</div>
				<div className="project-tags">
					{project.tags.map((tag, index) => {
						return (
							<div key={index} className="project-tag">
								<p>{tag}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="project-panel-footer">
				<button type="button" className="project-panel-more-info" onClick={() => window.open(project.moreInfo, "_blank")}>
					More info about the project
				</button>
				<button type="button" className="project-panel-close" onClick={handleClose}>
					Close
				</button>
			</div>
		</aside>
	);
};

export default ProjectPanel;
