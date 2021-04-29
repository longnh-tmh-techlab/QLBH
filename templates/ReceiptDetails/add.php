<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\ReceiptDetail $receiptDetail
 */
?>
<div class="row">
    <aside class="column">
        <div class="side-nav">
            <h4 class="heading"><?= __('Actions') ?></h4>
            <?= $this->Html->link(__('List Receipt Details'), ['action' => 'index'], ['class' => 'side-nav-item']) ?>
        </div>
    </aside>
    <div class="column-responsive column-80">
        <div class="receiptDetails form content">
            <?= $this->Form->create($receiptDetail) ?>
            <fieldset>
                <legend><?= __('Add Receipt Detail') ?></legend>
                <?php
                    echo $this->Form->control('id');
                    echo $this->Form->control('size_id');
                    echo $this->Form->control('color_id');
                    echo $this->Form->control('count');
                ?>
            </fieldset>
            <?= $this->Form->button(__('Submit')) ?>
            <?= $this->Form->end() ?>
        </div>
    </div>
</div>
