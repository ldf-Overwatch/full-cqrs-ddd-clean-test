import UniqueEntityID from 'cuid'

export abstract class Entity<T> {
    readonly _id: string
    protected props: T

    constructor(props: T, id?: string) {
        this._id = id ? id : UniqueEntityID()
        this.props = props
    }
}
