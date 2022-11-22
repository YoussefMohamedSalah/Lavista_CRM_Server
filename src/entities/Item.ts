import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { BrokenItem } from "./qr_code/broken_items_options";
import { GenerateQrCode } from "./qr_code/generateQrCode";

@Entity("item")
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    title: string;

    @Column({
        nullable: false,
    })
    label: string;

    @Column({
        nullable: true,
        default: true,
    })
    condition: boolean;

    @Column({
        type: "simple-array",
        default: [],
    })
    needs: string[];

    // relasion with Parent Category
    @ManyToOne(() => Category, (category) => category.items)
    @JoinColumn({
        name: "category_Id",
    })
    category: Category;

    // relasion with cild Broken Items List
    @OneToMany(() => BrokenItem, (brokenItem) => brokenItem.item_id)
    brokenItems: BrokenItem[];

    // relasion with cild Qrcode List
    @OneToMany(() => GenerateQrCode, (generateQrCode) => generateQrCode.item_id)
    qrCodeList: GenerateQrCode[];
}
