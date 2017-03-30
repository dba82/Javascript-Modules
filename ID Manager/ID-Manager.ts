export class IdManager{
    public ID = 0;
    newId(){
        return this.ID++;
    }
}