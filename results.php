<?php
    if($_COOKIE['packet']){
        $links = json_decode($_COOKIE['packet'])->data;
    }

    $post = $_POST['response']['response'] ?? '';
    $domen = $_POST['request']["url"] ?? str_replace(["\r","\r\n"],"",$links[0]->url);

    if($post){
        $userData = $post["user_data"] ?? [];
        $topData = $post['top_data'] ?? [];
        $analyzed_urls = $post['analized_urls'] ?? [];
	    $advanced_data = $post['advanced_data'] ?? [];
    }
?>

<script>

</script>

<a class="return" href="/">Назад</a>

<div class="inner">
    <nav>
        <h3>Список продвигаемыъх URL:</h3>
        <ul>
            <?foreach($links as $link):?>
                <?$url = str_replace(["\r","\r\n"],"",$link->url);?>
                <li><a <?if($domen == $url) echo 'class="active"'?> href="/" data-id="<?=$link->report_id?>"><?=$url?></a></li>
            <?endforeach;?>
        </ul>
    </nav>

    <div class="inner-container">
        <h2>Результаты анализа:</h2>

        <?if (!empty($userData) && !empty($topData)):?>
            <table border="1">
                <tr>
                    <td>Анализируемый фактор</td>
                    <td>Данные продвигаемого URL</td>
                    <td>Данные по ТОП</td>
                </tr>
                <tr>
                    <td>Объем текста в словах / символах</td>
                    <td><?=$userData['text_volume']['words']?> / <?=$userData['text_volume']['symbols']?> (<?=($topData['text_volume']['words']-$userData['text_volume']['words'])?> / <?=($topData['text_volume']['symbols']-$userData['text_volume']['symbols'])?>)</td>
                    <td><?=$topData['text_volume']['words']?> / <?=$topData['text_volume']['symbols']?></td>
                </tr>
                <tr>
                    <td>Количество точных вхождений запроса в текст</td>
                    <td><?=$userData['query_in_text_exact']?> (<?=($topData['query_in_text_exact']-$userData['query_in_text_exact'])?>)</td>
                    <td><?=$topData['query_in_text_exact']?></td>
                </tr>
                <tr>
                    <td>Процент вхождения слов из запроса в текст</td>
                    <td>
                        <?for ($i = 0;$i < count($userData['query_words_in_text_percent']);$i++):?>
                            <p><?=$userData['query_words_in_text_percent'][$i]['word']?>: <?=$userData['query_words_in_text_percent'][$i]['percent']?>% (<?=($topData['query_words_in_text_percent'][$i]['percent']-$userData['query_words_in_text_percent'][$i]['percent'])?>)</p>
                        <?endfor;?>
                    </td>
                    <td>
                        <?for ($i = 0;$i < count($topData['query_words_in_text_percent']);$i++):?>
                            <p><?=$topData['query_words_in_text_percent'][$i]['word']?>: <?=$topData['query_words_in_text_percent'][$i]['percent']?>%</p>
                        <?endfor;?>
                    </td>
                </tr>
                <tr>
                    <td>Вхождения слов из запроса в тег Title</td>
                    <td>
                        <?for ($i = 0;$i < count($userData['query_words_in_title']);$i++):?>
                            <p><?=$userData['query_words_in_title'][$i]['words']?>: <?=$userData['query_words_in_title'][$i]['count']?>% (<?=($topData['query_words_in_title'][$i]['count']-$userData['query_words_in_title'][$i]['count'])?>)</p>
                        <?endfor;?>
                    </td>
                    <td>
                        <?foreach ($topData['query_words_in_title'] as $qwit):?>
                            <p><?=$qwit['words']?>: <?=$qwit['count']?>%</p>
                        <?endforeach;?>
                    </td>
                </tr>
                <tr>
                    <td>Вхождения в анкоры исходящих ссылок</td>
                    <td>
                        <?for ($i = 0;$i < count($userData['query_words_in_anchors']);$i++):?>
                            <p><?=$userData['query_words_in_anchors'][$i]['word']?>: <?=$userData['query_words_in_anchors'][$i]['count']?>% (<?=($topData['query_words_in_anchors'][$i]['count']-$userData['query_words_in_anchors'][$i]['count'])?>)</p>
                        <?endfor;?>
                    </td>
                    <td>
                        <?foreach ($topData['query_words_in_anchors'] as $qwia):?>
                            <p><?=$qwia['word']?>: <?=$qwia['count']?>%</p>
                        <?endforeach;?>
                    </td>
                </tr>
                <tr>
                    <td>Внутренних исходящих ссылок на странице</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Процент вхождения переколдовок в текст</td>
                    <td>
                        <?for ($i = 0;$i < count($userData['hlwords_in_text']);$i++):?>
                            <p><?=$userData['hlwords_in_text'][$i]['word']?>: <?=$userData['hlwords_in_text'][$i]['percent']?>% (<?=($topData['hlwords_in_text'][$i]['percent']-$userData['hlwords_in_text'][$i]['percent'])?>)</p>
                        <?endfor;?>
                    </td>
                    <td>
                        <?foreach ($topData['hlwords_in_text'] as $qwia):?>
                            <p><?=$qwia['word']?>: <?=$qwia['percent']?>%</p>
                        <?endforeach;?>
                    </td>
                </tr>
                <tr>
                    <td>Отсутствие в тексте слов, которые часто встречаются у конкурентов</td>
                    <td>
                        <?if($userData['popular_words']):?>
                            <?=(implode(", ", $userData['popular_words']))?>
                        <?endif;?>
                    </td>
                    <td>
                        <?if($topData['popular_words']):?>
                            <?=(implode(", ", $userData['popular_words']))?>
                        <?endif;?>
                    </td>
                </tr>
                <tr>
                    <td>Число релевантных документов по тегу Title</td>
                    <td><?=$userData['rel_docs_by_title']?></td>
                    <td><?=$topData['rel_docs_by_title']?></td>
                </tr>
                <tr>
                    <td>Длина тега Title в словах / символах</td>
                    <td><?=$userData['title_volume']['words']?> / <?=$userData['title_volume']['symbols']?> (<?=($topData['title_volume']['words']-$userData['title_volume']['words'])?> / <?=($topData['title_volume']['symbols']-$userData['title_volume']['symbols'])?>)</td>
                    <td><?=$topData['title_volume']['words']?> / <?=$topData['title_volume']['symbols']?></td>
                </tr>
                <tr>
                    <td>Внешних ссылок на домен</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>тИЦ</td>
                    <td><?=$userData['tcy']?> (<?=($topData['tcy']-$userData['tcy'])?>)</td>
                    <td><?=$topData['tcy']?></td>
                </tr>
                <tr>
                    <td>Наличие HTTPS и доля конкурентов на HTTPS</td>
                    <td><?echo (!empty($userData['https']) ? "Да" : "Нет")?></td>
                    <td><?echo ($topData['https'] ? $topData['https'] : "Нет")?></td>
                </tr>
                <tr>
                    <td>Наличие номера 8 800 и доля конкурентов c 8 800</td>
                    <td><?echo (!empty($userData['8800']) ? "Да": "Нет")?></td>
                    <td><?echo ($topData['8800'] ? $topData['8800'] : "Нет")?></td>
                </tr>
            </table>
            <table border="1">
                <tr>
                    <td colspan="3">Сводка по текущим показателям</td>
                </tr>
                <tr>
                    <td>Анализируемый запрос: </td>
                    <td><?=$advanced_data['query']?></td>
                </tr>
                <tr>
                    <td>Релевантный URL:</td>
                    <td><?=$advanced_data['rel_url']?></td>
                </tr>
                <tr>
                    <td>Текущая позиция релевантного URL: </td>
                    <td><?=$advanced_data['rel_url_current_position']?></td>
                </tr>
                <tr>
                    <td>Возраст релевантного URL</td>
                    <td><?=$advanced_data['rel_url_age']?></td>
                </tr>
                <tr>
                    <td>Анализируемый URL:</td>
                    <td><?=$advanced_data['analized_url']?></td>
                </tr>
                <tr>
                    <td>Возраст анализируемого URL:</td>
                    <td><?=$advanced_data['analized_url_age']?></td>
                </tr>
            </table>
        <?endif;?>

        <h2>Анализируемый список URL:</h2>

	    <?if (!empty($analyzed_urls)):?>
            <ul>
                <?for ($i = 1;$i < count($analyzed_urls);$i++):?>
                    <li><?=$i?>. <?=$analyzed_urls[$i]?></li>
                <?endfor;?>
            </ul>
	    <?endif;?>
    </div>
</div>