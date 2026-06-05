class BaseRepository {

    constructor(model: any){
        this.model = model;
    }

    async findAll(filter = {}, options={}){
        const {sort, limit, skip, populate, select} = options;

        let query = this.model.find(filter);

    
        if(select) query = query.select(select);
        if(sort) query = query.sort(sort);    
        if(limit) query = query.limit(limit);
        if(skip) query = query.skip(skip);
        if(populate) query = query.populate(populate);

        return await query.exec()

    }

    async findById(id, options={}){
        const {populate, select} = options;
        

        let query = this.model.findById(id);
        if(select) query = query.select(select);
        if(populate) query = query.populate(populate);

        return await query.exec()
    }


    async findOne(filters: any, options={}){
        const {populate, select} = options;
        

        let query = this.model.findOne(filters);
        if(select) query = query.select(select);
        if(populate) query = query.populate(populate);

        return await query.exec()
    }

    async create(data: any){
        const document = new this.model(data);
        return await document.save();
    }

    async updateById(id: string, updateData: any, options={}){
        // check this 
        const defaultOptions = {
            new: true,
            ...options
        }

        return await this.model.findByIdAndUpdate(id,{...updateData, updatedAt: new Date()})
    }

    async deleteById(id: string){
        return await this.model.findByIdAndDelete(id)
    }

    async count(filters={}){
        return await this.model.countDocuments(filters)
    }
}

export default BaseRepository;