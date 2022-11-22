import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Item } from "../Item";

@Entity("generate_qrcode")
export class GenerateQrCode extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serial: string;

    @Column({
        nullable: true,
    })
    image: string;

    // relasion with Parent Section
    @ManyToOne(() => Item, (item) => item.qrCodeList)
    @JoinColumn({
        name: "item_id",
    })
    item_id: Item;
}
