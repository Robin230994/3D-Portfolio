export default class NullMaterialException extends Error {
	private msg: string;

	public constructor(msg: string) {
		super(msg);
		this.msg = msg;
	}

	public getExceptionMessage(): string {
		return this.msg;
	}
}
