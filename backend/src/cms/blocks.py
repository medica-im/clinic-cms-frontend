"""Streamfields live in here."""

from wagtail.core import blocks
from wagtail.core.templatetags.wagtailcore_tags import richtext
from wagtail.images.blocks import ImageChooserBlock
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator


class SlideDateBlock(blocks.StructBlock):
    year = blocks.IntegerBlock(
        required=False
    )
    month = blocks.IntegerBlock(
        required=False,
        validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    day = blocks.IntegerBlock(
        required=False,
        validators=[MinValueValidator(1), MaxValueValidator(31)]
    )
    hour = blocks.IntegerBlock(
        required=False,
        validators=[MinValueValidator(0), MaxValueValidator(23)]
    )
    minute = blocks.IntegerBlock(
        required=False,
        validators=[MinValueValidator(0), MaxValueValidator(59)]
    )
    second = blocks.IntegerBlock(
        required=False,
        validators=[MinValueValidator(0), MaxValueValidator(59)]
    )
    millisecond = blocks.IntegerBlock(
        required=False,
        validators=[MinValueValidator(0)]
    )
    display_date = blocks.CharBlock(
        required=False,
        max_length=255,
        help_text="A string for presenting the date. This value will be presented exactly as specified, overriding TimelineJS's default date formatting. Note that the year property, at a minimum, must still be provided so that TimelineJS can properly position the event on the actual timeline. "
    )
    format = blocks.CharBlock(
        required=False,
        max_length=255,
        help_text="A formatting string which will be used to render the date parts, if you wish to override TimelineJS's default formatting. Note that in general you can achieve the same with display_date (above), without needing to master the complexity of the date format strings."
    )


class SlideMediaBlock(blocks.StructBlock):
    image = ImageChooserBlock(
        required=False
    )
    url = blocks.URLBlock(
        required=False,
        help_text="url, iframe or blockquote"
    )
    alt = blocks.CharBlock(
        required=False,
        max_length=255,
        help_text="An alt tag for your image. If none is provided, the caption, if any, will be used."
    )
    caption = blocks.RichTextBlock(required=False)
    credit = blocks.RichTextBlock(required=False)
    thumbnail = blocks.URLBlock(
        required=False,
        help_text="A URL for an image to use in the timenav marker for this event. If omitted, Timeline will use an icon based on the type of media. Not relevant for title slides, because they do not have a marker.",
    )
    title = blocks.CharBlock(
        required=False,
        max_length=255,
        help_text="A title for your image. If none is provided, the caption, if any, will be used. "
    )
    link = blocks.URLBlock(
        required=False,
        help_text="Optional URL to use as the href for wrapping the media with an <a> tag. "
    )
    link_target = blocks.ChoiceBlock(
        choices=[
            ('_blank', '_blank'),
            ('_self', '_self'),
            ('_parent', '_parent'),
            ('_top', '_top'),
        ],
        icon='cup',
        required=False
    )

    class Meta:
        icon = 'image'
        label_format = 'Media'


class SlideTextBlock(blocks.StructBlock):
    """Text objects are JSON objects with the following properties. For each slide, text objects are optional.
    Name     | Required? | Notes
    headline | No        | Any text. HTML markup is OK. Blank is also OK.
    text     | No        | Any text. HTML markup is OK. Blank is OK. Not used  for era objects.
    """
    headline = blocks.RichTextBlock(required=False)
    text = blocks.RichTextBlock(required=False)

    class Meta:
        icon = 'edit'


class SlideBlock(blocks.StreamBlock):
    """Slides for TimelineJS."""

    title = blocks.StructBlock(
        [
            ('text', SlideTextBlock()),
            ('media', SlideMediaBlock()),
            ('group', blocks.CharBlock(
                    required=False,
                    max_length=255,
                    help_text=_("Any text. If present, Timeline will organize events with the same value for group to be in the same row or adjacent rows, separate from events in other groups. The common value for the group will be shown as a label at the left edge of the navigation."),
                )),
            ('display_date', blocks.CharBlock(
                required=False,
                max_length=255,
                help_text="A string for presenting the date. This value will be presented exactly as specified, overriding TimelineJS's default date formatting. Note that the year property, at a minimum, must still be provided so that TimelineJS can properly position the event on the actual timeline. "
            )),
        ],
        label_format = 'Title'
    )    

    events = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("id", blocks.CharBlock(
                required=False,
                max_length=255,
                help_text="A string value which is unique among all slides in your timeline. If not specified, TimelineJS will construct an ID based on the headline, but if you later edit your headline, the ID will change. Unique IDs are used when the hash_bookmark option is used, and can also be used with the timeline.goToId() method to programmatically move the timeline to a specific slide."
                )),
                ("start_date", SlideDateBlock(
                    required=True
                )),
                ("end_date", SlideDateBlock(
                    required=False
                )),
                ('text', SlideTextBlock()),
                ('media', SlideMediaBlock()),
                ('group', blocks.CharBlock(
                    required=False,
                    max_length=255,
                    help_text=_("Any text. If present, Timeline will organize events with the same value for group to be in the same row or adjacent rows, separate from events in other groups. The common value for the group will be shown as a label at the left edge of the navigation."),
                ))
            ]
        )
    )

    class Meta:  # noqa
        template = "cms/slide_block.html"
        icon = "placeholder"
        label = "Timeline slides"
