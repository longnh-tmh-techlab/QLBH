<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Manufacture $manufacture
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $manufacturer->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $manufacturer->id), 'class' => 'side-nav-item']
            ) ?>
            <?= $this->Html->link(__('List Manufacturers'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="manufacturers form content">
            <?= $this->Form->create($manufacturer) ?>
            <fieldset>
                <legend><?= __('Edit Manufacturer') ?></legend>
                <?php
                    echo $this->Form->control('name');
                    echo $this->Form->control('phone');
                    echo $this->Form->control('address');
                    echo $this->Form->control('email');
                    echo $this->Form->control('note');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
