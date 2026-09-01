import { IProjectDescription } from "../../interfaces/GLlnterfaces";
import { useEffect, useRef } from "react";
import { useProjectPanelStore } from "../../Stores/useProjectPanelStore";

interface IProjectPanel {
	project: IProjectDescription;
}

const ProjectPanel: React.FC<IProjectPanel> = ({ project }) => {
	const mainPanelRef = useRef<HTMLDivElement>(null);
	const mainPanelTagsRef = useRef<HTMLDivElement>(null);
	const panelClosed = useProjectPanelStore((state) => state.panelClosed);
	const setPanelClosed = useProjectPanelStore((state) => state.setPanelClosed);

	const handleClose = () => setPanelClosed(true);

	useEffect(() => {
		const panel = mainPanelRef.current;
		const tagsPanel = mainPanelTagsRef.current;
		if (!panel || !tagsPanel) return;

		let frameId = 0;
		let previousTime = 0;
		let pauseUntil = 0;
		let tagsPauseUntil = 0;
		let isReturningToTop = false;
		let virtualScrollTop = panel.scrollTop;
		let virtualScrollLeft = tagsPanel.scrollLeft;
		let syncFrameId = 0;
		let tagsSyncFrameId = 0;

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

		const pauseTagsAutoScroll = () => {
			tagsPauseUntil = performance.now() + 1500;

			window.cancelAnimationFrame(tagsSyncFrameId);
			tagsSyncFrameId = window.requestAnimationFrame(() => {
				virtualScrollLeft = tagsPanel.scrollLeft;
			});
		};

		const syncManualTagsScroll = () => {
			if (performance.now() < tagsPauseUntil) {
				virtualScrollLeft = tagsPanel.scrollLeft;
			}
		};

		panel.addEventListener("wheel", pauseAutoScroll, { passive: true });
		panel.addEventListener("touchstart", pauseAutoScroll, { passive: true });
		panel.addEventListener("pointerover", pauseAutoScroll);
		panel.addEventListener("pointerdown", pauseAutoScroll);
		panel.addEventListener("scroll", syncManualScroll, { passive: true });
		tagsPanel.addEventListener("wheel", pauseTagsAutoScroll, { passive: true });
		tagsPanel.addEventListener("touchstart", pauseTagsAutoScroll, { passive: true });
		tagsPanel.addEventListener("pointerover", pauseTagsAutoScroll);
		tagsPanel.addEventListener("pointerdown", pauseTagsAutoScroll);
		tagsPanel.addEventListener("scroll", syncManualTagsScroll, { passive: true });

		const autoScroll = (time: number) => {
			const maxScrollTop = panel.scrollHeight - panel.clientHeight;
			const maxScrollWidthTags = tagsPanel.scrollWidth - tagsPanel.clientWidth;

			if (maxScrollTop <= 0) {
				virtualScrollTop = 0;
				pauseUntil = 0;
				isReturningToTop = false;
			} else if (isReturningToTop) {
				if (time >= pauseUntil) {
					isReturningToTop = false;
					virtualScrollTop = panel.scrollTop;
				}
			} else if (previousTime && time >= pauseUntil) {
				const elapsedSeconds = (time - previousTime) / 1000;
				virtualScrollTop += elapsedSeconds * 15;

				if (virtualScrollTop >= maxScrollTop) {
					virtualScrollTop = maxScrollTop;
					panel.scrollTop = maxScrollTop;
					panel.scrollTo({ top: 0, behavior: "smooth" });
					isReturningToTop = true;
					pauseUntil = time + 800;
				} else {
					panel.scrollTop = virtualScrollTop;
				}
			}

			if (maxScrollWidthTags <= 0) {
				virtualScrollLeft = 0;
			} else if (previousTime && time >= tagsPauseUntil) {
				const elapsedSeconds = (time - previousTime) / 1000;
				const loopWidth = tagsPanel.scrollWidth / 2;

				virtualScrollLeft += elapsedSeconds * 10;

				if (virtualScrollLeft >= loopWidth) {
					virtualScrollLeft -= loopWidth;
				}

				tagsPanel.scrollLeft = virtualScrollLeft;
			}

			previousTime = time;
			frameId = window.requestAnimationFrame(autoScroll);
		};

		frameId = window.requestAnimationFrame(autoScroll);
		return () => {
			window.cancelAnimationFrame(frameId);
			window.cancelAnimationFrame(syncFrameId);
			window.cancelAnimationFrame(tagsSyncFrameId);
			panel.removeEventListener("wheel", pauseAutoScroll);
			panel.removeEventListener("touchstart", pauseAutoScroll);
			panel.removeEventListener("pointerover", pauseAutoScroll);
			panel.removeEventListener("pointerdown", pauseAutoScroll);
			panel.removeEventListener("scroll", syncManualScroll);
			tagsPanel.removeEventListener("wheel", pauseTagsAutoScroll);
			tagsPanel.removeEventListener("touchstart", pauseTagsAutoScroll);
			tagsPanel.removeEventListener("pointerover", pauseTagsAutoScroll);
			tagsPanel.removeEventListener("pointerdown", pauseTagsAutoScroll);
			tagsPanel.removeEventListener("scroll", syncManualTagsScroll);
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
				<div ref={mainPanelTagsRef} className="project-tags">
					{/* Duplicate the tags array to create a seamless scrolling effect */}
					{[...project.tags, ...project.tags].map((tag, index) => (
						<div key={`${tag}-${index}`} className="project-tag">
							<p>{tag}</p>
						</div>
					))}
				</div>
			</div>
			<div className="project-panel-footer">
				<button type="button" className="project-panel-more-info" onClick={() => window.open(project.moreInfo, "_blank")}>
					More about the project
				</button>
				<button type="button" className="project-panel-close" onClick={handleClose}>
					Close
				</button>
			</div>
		</aside>
	);
};

export default ProjectPanel;
