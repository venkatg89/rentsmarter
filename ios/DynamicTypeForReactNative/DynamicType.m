//
//  DynamicType.m
//  RentSmarter
//
//  Created by Michael Prenez-Isbell on 8/18/21.
//

#import "DynamicType.h"
#import <UIKit/UIKit.h>

@implementation DynamicType

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport {
  
    NSDictionary *dynamicSizes = @{ @"Headline"     : @([UIFont preferredFontForTextStyle:UIFontTextStyleHeadline].fontDescriptor.pointSize),
                                    @"Subheadline"  : @([UIFont preferredFontForTextStyle:UIFontTextStyleSubheadline].fontDescriptor.pointSize),
                                    @"Body"         : @([UIFont preferredFontForTextStyle:UIFontTextStyleBody].fontDescriptor.pointSize),
                                    @"Caption1"     : @([UIFont preferredFontForTextStyle:UIFontTextStyleCaption1].fontDescriptor.pointSize),
                                    @"Caption2"     : @([UIFont preferredFontForTextStyle:UIFontTextStyleCaption2].fontDescriptor.pointSize),
                                    @"Footnote"     : @([UIFont preferredFontForTextStyle:UIFontTextStyleFootnote].fontDescriptor.pointSize)};
  
  return dynamicSizes;
}

@end
