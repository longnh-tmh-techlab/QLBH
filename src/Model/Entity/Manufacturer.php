<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Manufacture Entity
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $email
 * @property string|null $note
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\Product[] $products
 * @property \App\Model\Entity\Receipt[] $receipts
 */
class Manufacture extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'name' => true,
        'phone' => true,
        'address' => true,
        'email' => true,
        'note' => true,
        'created' => true,
        'modified' => true,
        'products' => true,
        'receipts' => true,
    ];
}
