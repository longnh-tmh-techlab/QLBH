<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CategoriesProduct Entity
 *
 * @property int $id
 * @property int|null $product_id
 * @property int|null $category_id
 *
 * @property \App\Model\Entity\Product $product
 * @property \App\Model\Entity\Category $category
 */
class CategoriesProduct extends Entity
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
        'product_id' => true,
        'category_id' => true,
        'product' => true,
        'category' => true,
    ];
}
